var roleRepairer = require('role.repairer');

module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E55S45') {
      var north2Room = new RoomPosition(23, 48, 'E55S45');
      creep.moveTo(north2Room);
    } else {
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
      // Step 1: Creep does not HAVE_LOAD, is at dropped energy or container -> Pick it up or withdraw it
      // Creep withdraws
      if (!HAVE_LOAD && null != source && creep.pos.isNearTo(source)) {
        creep.harvest(source);
        return OK;
      }
      // Step 2: Creep does not HAVE_LOAD, not at container -> Move to fullest one
      if (!HAVE_LOAD && null != source && !creep.pos.isNearTo(source)) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
        return OK;
      }
      // Step 3: Creep does HAVE_LOAD, is at constructionSite -> Build it
      if (HAVE_LOAD && constructionSite != null && creep.pos.inRangeTo(constructionSite, 3)) {
        creep.build(constructionSite)
        return OK;
      }
      // Step 4: Creep does HAVE_LOAD, not at constructionSite -> Move to it
      if (HAVE_LOAD && constructionSite != null && !creep.pos.isNearTo(constructionSite)) {
        creep.moveTo(constructionSite, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
        return OK;
      }
      // Step 5: Creep can't build -> Become Repairer
      var repairRatio = 1
      var normalRepairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax * repairRatio && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
      });
      if (HAVE_LOAD && constructionSite == null) {
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
      }
    }
  }
}
