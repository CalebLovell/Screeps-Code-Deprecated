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
    // Variables
    var HAVE_LOAD = creep.memory.HAVE_LOAD;
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
    if (creep.room.name != 'E54S48') {
      var westRoom = new RoomPosition(45, 35, 'E54S48');
      creep.moveTo(westRoom);
      return OK;
    } else {
      // Step 1: Creep does not HAVE_LOAD, is at dropped energy or container -> Pick it up or withdraw it
      // Creep withdraws from biggest container in room over 100 energy
      var containers = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER &&
          s.store[RESOURCE_ENERGY] > 100
      });
      var containerFullest = null;
      if (containers.length > 0) {
        containerFullest = _.max(containers, c => c.store[RESOURCE_ENERGY])
      };
      if (!HAVE_LOAD && null != containerFullest && creep.pos.isNearTo(containerFullest)) {
        creep.withdraw(containerFullest, RESOURCE_ENERGY);
        return OK;
      }
      // Creep picks up dropped resource piles
      var droppedResources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
      if (!HAVE_LOAD && droppedResources.length > 0) {
        creep.pickup(droppedResources[0]);
        return OK;
      }
      // Step 2: Creep does not HAVE_LOAD, not at container -> Move to fullest one
      if (!HAVE_LOAD && null != containerFullest && !creep.pos.isNearTo(containerFullest)) {
        creep.moveTo(containerFullest, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
        return OK;
      }
    }
    if (creep.room.name != 'E54S49') {
      var homeBase = new RoomPosition(37, 20, 'E54S49');
      creep.moveTo(homeBase);
      return OK;
    } else {
      // Step 3: Creep does HAVE_LOAD, not at structures / storage -> Move to structures first or to storage if structures were full
      // Creep move to structuresFill if not full of energy
      if (HAVE_LOAD && !creep.pos.isNearTo(structuresFill)) {
        creep.moveTo(structuresFill, {
          visualizePathStyle: {
            stroke: '#ffaa00'
          }
        });
        return OK;
      }
      // Fill structuresFill
      if (HAVE_LOAD && creep.pos.isNearTo(structuresFill)) {
        creep.transfer(structuresFill, RESOURCE_ENERGY);
        return OK;
      }
      // Creep move to storage if not full of energy
      if (HAVE_LOAD && !creep.pos.isNearTo(storageFill)) {
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
//     if (creep.memory.working == true && creep.carry.energy == 0) {
//       creep.memory.working = false;
//       creep.say('\u{26CF}');
//     } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
//       creep.memory.working = true;
//       creep.say('\u{1f69A}');
//     }
//     // work part if else
//     if (creep.memory.working == true) {
// if (creep.room.name != 'E54S49') {
//   var homeBase = new RoomPosition(37, 20, 'E54S49');
//   creep.moveTo(homeBase);
// } else {
//         var storage = creep.room.storage
//         if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(storage, {
//             visualizePathStyle: {
//               stroke: '#ffaa00'
//             }
//           });
//         }
//       }
//     } else {
// if (creep.room.name != 'E53S49') {
//   var westRoom = new RoomPosition(45, 35, 'E53S49');
//   creep.moveTo(westRoom);
// } else {
//         var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
//         var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
//           filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
//             i.store[RESOURCE_ENERGY] > 100
//         });
//         if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(container);
//         } else if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
//             creep.moveTo(droppedEnergy);
//         }
//       }
//     }
//   }
// };
