module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E53S48') {
      var northwestRoom = new RoomPosition(45, 29, 'E53S48');
      creep.moveTo(northwestRoom);
    } else {
      let sources = creep.room.find(FIND_SOURCES);
      var chosenSource;
      var containerBySource;
      for (var s in sources) {
        var nearByMiners = sources[s].pos.findInRange(FIND_MY_CREEPS, 1, {
          filter: (c) => c.memory.role == 'northwestminer' && c != creep
        });
        //console.log("soureces: " + sources[s]);
        containerBySource = sources[s].pos.findInRange(FIND_STRUCTURES, 1, {
          filter: {
            structureType: STRUCTURE_CONTAINER
          }
        })
        if (containerBySource.length == 0) {
          continue;
        }
        if (nearByMiners.length == 0) {
          chosenSource = s;
          break;
        }
      }
      //console.log("chosensource: " + chosenSource);
      let allContainers = creep.room.find(FIND_STRUCTURES, {
        filter: {
          structureType: STRUCTURE_CONTAINER
        }
      });
      //console.log(allContainers)
      var onContainer = false;
      for (var i in allContainers) {
        if (creep.pos.isEqualTo(allContainers[i])) {
          onContainer = true;
        }
      }
      //console.log("cont:" + container);
      if (onContainer) {
        //console.log("on container");
        var sourceToHarvest = creep.pos.findInRange(FIND_SOURCES, 1);
        creep.harvest(sourceToHarvest[0]);
      } else {
        //console.log("not on container")
        creep.moveTo(containerBySource[0], {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
      }
    }
  }
};
