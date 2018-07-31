var roleRepairer = require('role.repairer');

module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E54S48') {
      var northRoom = new RoomPosition(29, 19, 'E54S48');
      creep.moveTo(northRoom);
    } else {
      if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false;
        creep.say('🔄 harvest');
      } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
        creep.say('🔨 build');
      }
      if (creep.memory.working == true) {
        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (constructionSite != undefined) {
          if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite, {
              visualizePathStyle: {
                stroke: '#ffaa00'
              }
            });
          }
        } else {
          roleRepairer.run(creep);
        }
      } else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {
            visualizePathStyle: {
              stroke: '#ffffff'
            }
          });
        }
      }
    }
  }
};
