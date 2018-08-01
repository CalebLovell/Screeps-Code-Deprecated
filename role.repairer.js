module.exports = {
  run: function(creep) {
    // State Switching & Say Action
    if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.HAVE_LOAD = true;
      creep.say('\u{1F6E0}'); // hammer and wrench emojii unicode
    }
    if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
      creep.memory.HAVE_LOAD = false;
      creep.say('\u{267B}'); // recycle emojii unicode
    }
    // Variables
    var HAVE_LOAD = creep.memory.HAVE_LOAD
    var storage = creep.room.storage
    var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
    var wallHP = 200000
    var repairRatio = 0.9
    var containerRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax * repairRatio
    });
    var normalRepairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax * repairRatio && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
    });
    var wallOrRampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && s.hits < wallHP
    });
    // Step 1: Creep does not HAVE_LOAD, is at dropped energy or container -> Pick it up or withdraw it
    if (!HAVE_LOAD && droppedResources.length > 0) {
      creep.pickup(droppedResources[0]);
      return OK;
    }
    if (!HAVE_LOAD && creep.pos.isNearTo(storage)) {
      creep.withdraw(storage, RESOURCE_ENERGY);
      return creep.withdraw(storage, RESOURCE_ENERGY);
    }
    // Step 2: Creep does HAVE_LOAD, wallOrRampart exists; -> Repair it or move to nearest one
    if (HAVE_LOAD && containerRepair != null) {
      if (creep.pos.inRangeTo(containerRepair, 3)) {
        creep.repair(containerRepair)
        return OK;
      } else {
        creep.moveTo(containerRepair, {
          containerRepair: {
            stroke: '#ffaa00'
          }
        });
        return OK;
      }
    }
    if (HAVE_LOAD && normalRepairSite != null) {
      if (creep.pos.inRangeTo(normalRepairSite, 3)) {
        creep.repair(normalRepairSite)
        return OK;
      } else {
        creep.moveTo(normalRepairSite, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        return OK;
      }
    }
    // Step 3: Creep does HAVE_LOAD, wallOrRampart exists; -> Repair it or move to nearest one
    if (HAVE_LOAD && wallOrRampart != null) {
      if (creep.pos.inRangeTo(wallOrRampart, 3)) {
        creep.repair(wallOrRampart)
        return OK;
      } else {
        creep.moveTo(wallOrRampart, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        return OK;
      }
    }
    // Step 3: Creep does not HAVE_LOAD, not at storage -> Move to it
    if (!HAVE_LOAD && !creep.pos.isNearTo(storage)) {
      creep.moveTo(storage, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
      return OK;
    }
  }
}
