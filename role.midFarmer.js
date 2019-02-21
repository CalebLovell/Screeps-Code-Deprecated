module.exports = {
  run: function(creep) {
    // state switching
    if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.HAVE_LOAD = true;
      creep.say('\u{1f69A}'); // truck emojii unicode
    }
    if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
      creep.memory.HAVE_LOAD = false;
      creep.say('\u{267B}'); // recycle emojii unicode
    }
    if (creep.pos.isEqualTo(safeSpot)) {
      creep.memory.safeSpot = true
    } else {
      creep.memory.safeSpot = false
    }
    // VARIABLES
    var repairRatio = 1
    var source = creep.pos.findClosestByPath(FIND_SOURCES);
    var HAVE_LOAD = creep.memory.HAVE_LOAD;
    var brokenRoad = creep.pos.findInRange(FIND_STRUCTURES, 0, {
      filter: (s) => (s.structureType == STRUCTURE_ROAD) &&
        s.hits <= s.hitsMax * repairRatio
    });
    var structuresFill = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => (s.structureType == STRUCTURE_EXTENSION ||
          s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_TOWER) &&
        s.energy < s.energyCapacity
    });
    var storageFill = creep.room.storage
    if (structuresFill == undefined) {
      structuresFill = storageFill
    };
    var safeSpot = Game.flags.Flag1
    var roomTwo = new RoomPosition(32, 1, 'E55S47');
    // Room Switch
    if (!HAVE_LOAD && creep.room.name != 'E55S45') {
      var midRoom = new RoomPosition(22, 48, 'E55S45');
      creep.moveTo(midRoom);
      return OK;
    } else {
      // Step 1: Creep does not HAVE_LOAD, is at source -> Harvest it
      // Creep harvests
      if (!HAVE_LOAD && null != source && creep.pos.isNearTo(source)) {
        creep.harvest(source);
        return OK;
      }
      // Step 2: Creep does not HAVE_LOAD, not at source -> Move to closest one
      if (!HAVE_LOAD && null != source && !creep.pos.isNearTo(source)) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
        return OK;
      }
      // terrible code to make creeps in middle room go to flag first before
      // entering the next SK room. Keeps them on the road and avoiding SKs
    }
    if (HAVE_LOAD && creep.room.name == 'E55S45' && creep.memory.safeSpot == false) {
      creep.moveTo(safeSpot)
      if (brokenRoad.length > 0 && HAVE_LOAD) {
        creep.repair(brokenRoad[0])
      }
      return OK;
    }
    if (HAVE_LOAD && creep.room.name == 'E55S45' && creep.memory.safeSpot == true) {
      creep.moveTo(roomTwo)
      if (brokenRoad.length > 0 && HAVE_LOAD) {
        creep.repair(brokenRoad[0])
      }
      return OK;
    }
    if (HAVE_LOAD && creep.room.name != 'E55S47') {
      creep.moveTo(roomTwo)
      if (brokenRoad.length > 0 && HAVE_LOAD) {
        creep.repair(brokenRoad[0])
      }
    } else {
      // Step 4: Creep does HAVE_LOAD, but structures are filled -> Move to storage
      // Creep move to storage if not full of energy
      if (HAVE_LOAD && !creep.pos.isNearTo(storageFill)) {
        if (brokenRoad.length > 0 && HAVE_LOAD) {
          creep.repair(brokenRoad[0])
        }
        creep.moveTo(storageFill, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        return OK;
      }
      // Fill storageFill
      if (HAVE_LOAD && creep.pos.isNearTo(storageFill)) {
        creep.transfer(storageFill, RESOURCE_ENERGY);
        return OK;
      }
    }
  }
}
