var roleRepairer = require('role.repairer');

module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E55S47') {
      var spawn2 = new RoomPosition(17, 43, 'E55S47');
      creep.moveTo(spawn2);
    } else {
      // State Switching & Say Action
      if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.HAVE_LOAD = true;
        creep.say('\u{1F528}'); // hammer emojii unicode
      }
      if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
        creep.memory.HAVE_LOAD = false;
        creep.say('\u{267B}'); // recycle emojii unicode
      }
      // Variables
      var HAVE_LOAD = creep.memory.HAVE_LOAD
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      var storage = creep.room.storage
      var controller = creep.room.controller
      var upgradeSpot = Game.flags.upgradeSpot
      // Step 1: Creep does not HAVE_LOAD, is at dropped energy or container -> Pick it up or withdraw it
      if (!HAVE_LOAD && creep.pos.isNearTo(storage)) {
        creep.withdraw(storage, RESOURCE_ENERGY);
        return OK;
      }
      // Step 2: Creep does HAVE_LOAD, not at constructionSite -> Move to nearest one
      if (HAVE_LOAD && upgradeSpot != null && !creep.pos.inRangeTo(upgradeSpot, 0)) {
        creep.moveTo(upgradeSpot, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        return OK;
      }
      // Step 3: Creep does HAVE_LOAD, is at constructionSite -> Build it
      if (HAVE_LOAD && controller != null && creep.pos.inRangeTo(controller, 3)) {
        creep.upgradeController(controller)
        return OK;
      }
      // Step 4: Creep does not HAVE_LOAD, not at storage -> Move to it
      if (!HAVE_LOAD && !creep.pos.isNearTo(storage)) {
        creep.moveTo(storage, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
        return OK;
      }
      // // Step 5: Creep can't build -> Become Repairer
      // var repairRatio = 1
      // var wallHP = 1000000
      // var normalRepairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      //   filter: (s) => s.hits < s.hitsMax * repairRatio && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
      // });
      // var wallOrRampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      //   filter: (s) => (s.structureType == STRUCTURE_WALL) && s.hits < wallHP
      // });
      // if (HAVE_LOAD && constructionSite == null) {
      //   if (HAVE_LOAD && normalRepairSite != null) {
      //     if (creep.pos.inRangeTo(normalRepairSite, 3)) {
      //       creep.repair(normalRepairSite)
      //       return OK;
      //     } else {
      //       creep.moveTo(normalRepairSite, {
      //         visualizePathStyle: {
      //           stroke: '#ffaa00'
      //         }
      //       });
      //       return OK;
      //     }
      //   }
      //   if (HAVE_LOAD && wallOrRampart != null) {
      //     if (creep.pos.inRangeTo(wallOrRampart, 3)) {
      //       creep.repair(wallOrRampart)
      //       return OK;
      //     } else {
      //       creep.moveTo(wallOrRampart, {
      //         visualizePathStyle: {
      //           stroke: '#ffaa00'
      //         }
      //       });
      //       return OK;
      //     }
      //   }
      // }
    }
  }
}
