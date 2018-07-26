module.exports = {
  run: function(creep) {
    // State Switching & Say Action
    if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.HAVE_LOAD = true;
      creep.say('\u{1f69A}'); // truck
    }
    if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
      creep.memory.HAVE_LOAD = false;
      creep.say('\u{267B}'); // recycle
    }
    // Variables
    var HAVE_LOAD = creep.memory.HAVE_LOAD
    var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_CONTAINER &&
        s.store[RESOURCE_ENERGY] > 100
    });

    // var container = _.max(container, c => c.store[RESOURCE_ENERGY])
    // Game.flags.Flag1.room.find(FIND_STRUCTURES, {filter: s => s.structureType == STRUCTURE_CONTAINER});
    // [structure (container) #5b53f56c20be52245f758a38], [structure (container) #5b54356b8178af5038ba0e67]

    var storage = creep.room.storage
    var myEnergyHolders = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (i) => (i.structureType == STRUCTURE_SPAWN ||
          i.structureType == STRUCTURE_EXTENSION ||
          i.structureType == STRUCTURE_TOWER) &&
        i.energy < i.energyCapacity
    });
    if (myEnergyHolders == undefined) {
      myEnergyHolders = storage
    }
    // Step 1: Creep is empty, not at dropped energy or container -> Move to it
    // let containers = creep.room.find(FIND_STRUCTURES, {
    //   filter: s => s.structureType === STRUCTURE_CONTAINER &&
    //    s.store[RESOURCE_ENERGY] > 100
    // });
    // if (!containers.length > 0) {
    //   let container = _.max(containers, c => c.store[RESOURCE_ENERGY])
    // } else {
    //   let container = null;
    // }
    if (!HAVE_LOAD && container && !creep.pos.isNearTo(container)) {
      creep.moveTo(container, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
      return OK;
    }
    // Step 2: Creep is empty, at dropped energy or container -> Pick it up or withdraw it
    if (!HAVE_LOAD && null != droppedEnergy && droppedEnergy > 30 && creep.pos.isNearTo(droppedEnergy)) {
      creep.pickup(droppedEnergy, RESOURCE_ENERGY);
      return OK;
    }
    if (!HAVE_LOAD && creep.pos.isNearTo(container)) {
      creep.withdraw(container, RESOURCE_ENERGY);
      return OK;
    }
    // Step 3: Creep is full, not at my energy holders or storage -> Move to it
    if (HAVE_LOAD && !creep.pos.isNearTo(myEnergyHolders)) {
      creep.moveTo(myEnergyHolders, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    // Step 4: Creep is full, at dropped energy or container -> Transfer energy
    if (HAVE_LOAD && creep.pos.isNearTo(myEnergyHolders)) {
      creep.transfer(myEnergyHolders, RESOURCE_ENERGY);
      return OK;
    }
    if (HAVE_LOAD && creep.pos.isNearTo(storage)) {
      creep.transfer(storage, RESOURCE_ENERGY);
      return OK;
    }
  }
}
