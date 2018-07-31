var roleRepairer = require('role.repairer');

module.exports = {
  run: function(creep) {
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
    var storage = creep.room.storage
    var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    // Step 1: Creep does not HAVE_LOAD, is at dropped energy or container -> Pick it up or withdraw it
    if (!HAVE_LOAD && droppedResources.length > 0) {
      creep.pickup(droppedResources[0]);
      return OK;
    }
    if (!HAVE_LOAD && creep.pos.isNearTo(storage)) {
      creep.withdraw(storage, RESOURCE_ENERGY);
      return creep.withdraw(storage, RESOURCE_ENERGY);
    }
    // Step 2: Creep does HAVE_LOAD, not at constructionSite -> Move to nearest one
    if (HAVE_LOAD && !creep.pos.inRangeTo(constructionSite, 3)) {
      creep.moveTo(constructionSite, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    // Step 3: Creep does HAVE_LOAD, is at constructionSite -> Build it
    if (HAVE_LOAD && creep.pos.inRangeTo(constructionSite, 3)) {
      creep.build(constructionSite)
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
  }
}
