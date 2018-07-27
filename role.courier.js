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
    var towerFill = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (t) => t.energy < t.energyCapacity && t.structureType == STRUCTURE_TOWER
    });
    var spawnOrExtensionsFill = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => (s.structureType == STRUCTURE_EXTENSION ||
          s.structureType == STRUCTURE_SPAWN) &&
          s.energy < s.energyCapacity
    });
    var storageFill = creep.room.storage
    if (towerFill == undefined) {
      towerFill = spawnOrExtensionsFill
    };
    if (spawnOrExtensionsFill == undefined) {
      spawnOrExtensionsFill = storageFill
    };
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
    // Step 3: Creep is full, not at tower / energy holder / storage -> Move to it
    // Creep move to tower if not full of energy
    if (HAVE_LOAD && !creep.pos.isNearTo(towerFill)) {
      creep.moveTo(towerFill, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    // Fill it
    if (HAVE_LOAD && creep.pos.isNearTo(towerFill)) {
      creep.transfer(towerFill, RESOURCE_ENERGY);
      return OK;
    }
    // Creep move to spawnOrExtension if not full of energy
    if (HAVE_LOAD && !creep.pos.isNearTo(spawnOrExtensionsFill)) {
      creep.moveTo(spawnOrExtensionsFill, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    // Fill it
    if (HAVE_LOAD && creep.pos.isNearTo(spawnOrExtensionsFill)) {
      creep.transfer(spawnOrExtensionsFill, RESOURCE_ENERGY);
      return OK;
    }
    // Creep move to storage if not full of energy
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

  // Code for making creeps target the container first if it's within 5 range
  // not ready at all. Needs complex filter that tells it to choose

  // var container500 = creep.room.find(FIND_STRUCTURES, {
  //   filter: s => s.structureType === STRUCTURE_CONTAINER &&
  //     s.store[RESOURCE_ENERGY] > 500
  // });
  //
  // if (!HAVE_LOAD && null != container500 && creep.pos.inRangeTo(container500, 5)) {
  //   creep.moveTo(container500);
  //   return OK;
  // }
