module.exports = {
  run: function(creep) {
    // State Switching & Say Action
    if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.HAVE_LOAD = true;
      creep.say('\u{1f69A}'); // truck emojii unicode
    }
    if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
      creep.memory.HAVE_LOAD = false;
      creep.say('\u{267B}'); // recycle emojii unicode
    }
    // Variables
    var HAVE_LOAD = creep.memory.HAVE_LOAD;
    var storageFill = creep.room.storage
    // if
    if (HAVE_LOAD == false) {
      if (creep.room.name != 'E54S49') {
        var homeBase = new RoomPosition(37, 20, 'E54S49');
        creep.moveTo(homeBase);
      } else {}
    if (creep.room.name != 'E54S48') {
      var northRoom = new RoomPosition(29, 29, 'E54S48');
      creep.moveTo(northRoom);
    } else {}


    // Step 1: Creep is not at capacity, is at dropped energy or container -> Pick it up or withdraw it
    // Creep picks up dropped resource piles over 40
    var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
    if (!HAVE_LOAD && null != droppedResources && droppedResources.length > 0 && droppedResources > 40) {
      creep.pickup(droppedResources[0]);
      return OK;
    }
    // Creep withdraws from biggest container in room over 100 energy
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
    // Step 2: Creep is not at capacity, not at container -> Move to fullest one
    if (!HAVE_LOAD && null != containerFullest && !creep.pos.isNearTo(containerFullest)) {
      creep.moveTo(containerFullest, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
      return OK;
    }
    // Step 3: Creep is full, not at storage -> Move to it
    // Creep move to storage if it's not full of energy
    if (HAVE_LOAD && !creep.pos.isNearTo(storageFill)) {
      creep.moveTo(storageFill, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    // Fill it
    if (HAVE_LOAD && creep.pos.isNearTo(storageFill)) {
      creep.transfer(storageFill, RESOURCE_ENERGY);
      return OK;
    }
  }
}
}
