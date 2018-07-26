module.exports = {
  run: function(creep) {
    // const changeRooms = new RoomPosition(20, 48, 'E54S49');
    // if (creep.room.name != changeRooms) {
    //   //let newEnemyRoom = new RoomPosition(10, 1, 'E52S50');
    //   creep.moveTo(changeRooms);
    // } else {
      let enemyRoom = Game.rooms['E54S49']
      var hostileCreeps = enemyRoom.find(FIND_HOSTILE_CREEPS);
      if (hostileCreeps) {
        if (creep.attack(hostileCreeps[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(hostileCreeps[0]);
        }
      }
      let hostileSpawns = enemyRoom.find(FIND_HOSTILE_SPAWNS);
      if (hostileSpawns) {
        if (creep.attack(hostileSpawns[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(hostileSpawns[0]);
        }
      }
      // let enemyStructures = enemyRoom.find(FIND_STRUCTURES, {
      //   filter: {
      //     structureType: STRUCTURE_WALL
      //   }
      // });
      // if (enemyStructures.length > 0) {
      //   if (creep.attack(enemyStructures) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(enemyStructures);
      //   }
      }
    }
  // }
// }
