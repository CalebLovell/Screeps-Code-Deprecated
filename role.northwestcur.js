module.exports = {
  run: function(creep) {
    // state switching
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
    var repairRatio = 1
    var brokenRoad = creep.pos.findInRange(FIND_STRUCTURES, 0, {
      filter: (s) => (s.structureType == STRUCTURE_ROAD) &&
        s.hits <= s.hitsMax * repairRatio
    });
    var unbuiltRoad = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 0);
    var structuresFill = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => (s.structureType == STRUCTURE_EXTENSION ||
          s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_TOWER) &&
        s.energy < s.energyCapacity
    });
    var storageFill = creep.room.storage
    if (structuresFill == undefined) {
      structuresFill = storageFill
    };
    if (!HAVE_LOAD && creep.room.name != 'E53S48') {
      var westRoom = new RoomPosition(45, 35, 'E53S48');
      creep.moveTo(westRoom);
      return OK;
    } else {
      // Step 1: Creep does not HAVE_LOAD, is at dropped energy or container -> Pick it up or withdraw it
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
      // Creep picks up dropped resource piles
      var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
      if (!HAVE_LOAD && droppedResources.length > 0) {
        creep.pickup(droppedResources[0]);
        return OK;
      }
      // Step 2: Creep does not HAVE_LOAD, not at container -> Move to fullest one
      if (!HAVE_LOAD && null != containerFullest && !creep.pos.isNearTo(containerFullest)) {
        creep.moveTo(containerFullest, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
        return OK;
      }
    }
    if (HAVE_LOAD && creep.room.name != 'E54S49') {
      var homeBase = new RoomPosition(37, 20, 'E54S49');
      creep.moveTo(homeBase);
      creep.build(unbuiltRoad);
      if (brokenRoad.length > 0) {
        creep.repair(brokenRoad[0])
      }
      return OK;
    } else {
      // Step 3: Creep does HAVE_LOAD, not at structures / storage -> Move to structures first or to storage if structures were full
      // Creep move to structuresFill if not full of energy
      if (HAVE_LOAD && !creep.pos.isNearTo(structuresFill)) {
        creep.moveTo(structuresFill, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        if (brokenRoad.length > 0) {
          creep.repair(brokenRoad[0])
        }
        return OK;
      }
      // Fill structuresFill
      if (HAVE_LOAD && creep.pos.isNearTo(structuresFill)) {
        creep.transfer(structuresFill, RESOURCE_ENERGY);
        return OK;
      }
      // Creep move to storage if not full of energy
      if (HAVE_LOAD && !creep.pos.isNearTo(storageFill)) {
        creep.moveTo(storageFill, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        if (brokenRoad.length > 0) {
          creep.repair(brokenRoad[0])
        }
        return OK;
      }
      // Fill storageFill
      if (HAVE_LOAD && creep.pos.isNearTo(storageFill)) {
        creep.transfer(storageFill, RESOURCE_ENERGY);
        return OK;
      }
    }
  }
}
