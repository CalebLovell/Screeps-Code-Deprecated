module.exports = {
  run: function(creep) {
    // state switching
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
      creep.say('\u{26CF}');
    } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('\u{1f69A}');
    }
    // work part if else
    if (creep.memory.working == true) {
      if (creep.room.name != 'E54S49') {
        var homeBase = new RoomPosition(37, 20, 'E54S49');
        creep.moveTo(homeBase);
      } else {
        var storage = creep.room.storage
        if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      }
    } else {
      if (creep.room.name != 'E53S49') {
        var westRoom = new RoomPosition(45, 35, 'E53S49');
        creep.moveTo(westRoom);
      } else {
        var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
            i.store[RESOURCE_ENERGY] > 0
        });
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        } else if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedEnergy);
        }
      }
    }
  }
};
