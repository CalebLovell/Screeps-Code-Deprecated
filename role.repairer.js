var roleHarvester = require('role.harvester');

module.exports = {
  run: function(creep) {
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
      creep.say('🔄 harvest');
    } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('🛠️ repair');
    }
    if (creep.memory.working == true) {
      var decayingStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (ds) => ds.hits < ds.hitsMax && ds.structureType != STRUCTURE_WALL
      });
      if (decayingStructure != undefined) {
        if (creep.repair(decayingStructure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(decayingStructure, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        } else {
          roleHarvester.run(creep);
        }
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
};
