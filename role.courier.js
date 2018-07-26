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
    var HAVE_LOAD = creep.memory.HAVE_LOAD;
    var myEnergyHolders = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (i) => (i.structureType == STRUCTURE_TOWER ||
          i.structureType == STRUCTURE_EXTENSION ||
          i.structureType == STRUCTURE_SPAWN) &&
        i.energy < i.energyCapacity
    });
    var storage = creep.room.storage
    if (myEnergyHolders == undefined) {
      myEnergyHolders = storage
    };
    // Step 1: Creep is not at capacity, at dropped energy or container -> Pick it up or withdraw it
    var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
    if (!HAVE_LOAD && null != droppedResources && droppedResources.length > 0 && droppedResources > 40) {
      creep.pickup(droppedResources[0]);
      return OK;
    }
    var containers = creep.room.find(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_CONTAINER &&
        s.store[RESOURCE_ENERGY] > 100
    });
    var containerFullest = null;
    if (containers.length > 0) {
      containerFullest = _.max(containers, c => c.store[RESOURCE_ENERGY])
    };
    if (!HAVE_LOAD && null != containerFullest && creep.pos.isNearTo(containerFullest)) {
      creep.withdraw(containerFullest, RESOURCE_ENERGY);
      return OK;
    }
    // Step 2: Creep is not at capacity, not at container -> Move to it
    if (!HAVE_LOAD && null != containerFullest && !creep.pos.isNearTo(containerFullest)) {
      creep.moveTo(containerFullest, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
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
