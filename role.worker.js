module.exports = {
  run: function(creep) {
    // State Switching & Say Action
    if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.HAVE_LOAD = true;
      creep.say('\u{1F4DA}'); // books emojii unicode
    }
    if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
      creep.memory.HAVE_LOAD = false;
      creep.say('\u{267B}'); // recycle emojii unicode
    }
    // Variables
    var HAVE_LOAD = creep.memory.HAVE_LOAD
    var storage = creep.room.storage
    // Step 1: Creep does not HAVE_LOAD, is at dropped energy or container -> Pick it up or withdraw it
    var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
    if (!HAVE_LOAD && droppedResources.length > 0) {
      creep.pickup(droppedResources[0]);
      return OK;
    }
    if (!HAVE_LOAD && creep.pos.isNearTo(storage)) {
      creep.withdraw(storage, RESOURCE_ENERGY);
      return creep.withdraw(storage, RESOURCE_ENERGY);
    }
    // Step 2: Creep does HAVE_LOAD, not at controller -> Move to it
    if (HAVE_LOAD && !creep.pos.inRangeTo(creep.room.controller, 3)) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    // Step 3: Creep does HAVE_LOAD, is at controller -> Upgrade it
    if (HAVE_LOAD && creep.pos.inRangeTo(creep.room.controller, 3)) {
      creep.upgradeController(creep.room.controller)
      return OK;
    }
    // Step 4: Creep does not HAVE_LOAD, is not at storage -> Move to it
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
