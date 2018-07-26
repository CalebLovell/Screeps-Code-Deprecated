var roleRepairer = require('role.repairer');

module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E53S49') {
      var westRoom = new RoomPosition(29, 19, 'E53S49');
      creep.moveTo(westRoom);
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
        var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (i) => i.structureType == STRUCTURE_CONTAINER
        });
        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
          creep.moveTo(droppedEnergy);
        } else if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  }
};
