module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E54S48') {
      var northRoom = new RoomPosition(29, 19, 'E54S48');
      creep.moveTo(northRoom);
    } else {
      let sources = creep.room.find(FIND_SOURCES);
      var chosenSource;
      for (var s in sources) {
        var nearbyMiners = sources[s].pos.findInRange(FIND_MY_CREEPS, 1, {
          filter: (c) => c.memory.role == 'miner' && c != creep
        });
        if (nearbyMiners.length == 0) {
          chosenSource = s;
          break;
        }
      }
      //console.log("chosensource: " + chosenSource);
      let container = sources[chosenSource].pos.findInRange(FIND_STRUCTURES, 1, {
        filter: {
          structureType: STRUCTURE_CONTAINER
        }
      })[0];
      // console.log("cont:" + container);
      if (creep.pos.isEqualTo(container)) {
        // console.log("on container");
        var sourceToHarvest = creep.pos.findInRange(FIND_SOURCES, 1);
        creep.harvest(sourceToHarvest[0]);
      } else {
        // console.log("not on container")
        creep.moveTo(container);
      }
    }
  }
};
