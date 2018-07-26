module.exports = {
  run: function(creep) {
    const HAVE_LOAD = creep.memory.HAVE_LOAD
    const storage = creep.room.storage
    if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.HAVE_LOAD = true;
      creep.say('\u{1F4DA}'); // books
    }
    if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
      creep.memory.HAVE_LOAD = false;
      creep.say('\u{267B}'); // recycle
    }
    if (!HAVE_LOAD && !creep.pos.isNearTo(storage)) {
      creep.moveTo(storage, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
      return OK;
    }
    if (!HAVE_LOAD && creep.pos.isNearTo(storage)) {
      creep.withdraw(storage, RESOURCE_ENERGY);
      return OK;
    }
    if (HAVE_LOAD && !creep.pos.inRangeTo(creep.room.controller, 3)) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    if (HAVE_LOAD && creep.pos.inRangeTo(creep.room.controller, 3)) {
      creep.upgradeController(creep.room.controller)
      return OK;
    }
  }
}
