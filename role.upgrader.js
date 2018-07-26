module.exports = {
  run: function(creep) {
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
      creep.say('🔄 harvest');
    } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('⬆️ upgrade');
    }
    if (creep.memory.working == true) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    } else {
      var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
      if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    }
  }
};
