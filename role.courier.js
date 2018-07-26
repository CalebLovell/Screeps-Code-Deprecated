module.exports = {
    run: function(creep) {
      if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false;
        creep.say('\u{267B}');
      } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
        creep.say('\u{1f69A}');
      }
      if (creep.memory.working == true) {
        var myEnergyHolders = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (mEH) => mEH.energy < mEH.energyCapacity
        });
        if (creep.transfer(myEnergyHolders, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(myEnergyHolders, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            } 
          });
        } else {
          var storage = creep.room.storage
          if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            creep.moveTo(storage);
        }
      } else {
        var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
            i.store[RESOURCE_ENERGY] > 0
        });
        if (null != droppedEnergy && creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
          creep.moveTo(droppedEnergy);
          return OK;
        }
        if (null != container && creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
          return OK;
          }
        }
      }
    };
