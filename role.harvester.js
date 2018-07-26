module.exports = {
  run: function(creep) {
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
      creep.say('\u{26CF}');
    } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('\u{1f69A}');
    }
    if (creep.memory.working == true) {
      var myEnergyHolders = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (mEH) => mEH.energy < mEH.energyCapacity
      });
      if (myEnergyHolders != undefined) {
        if (creep.transfer(myEnergyHolders, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(myEnergyHolders, {
            visualizePathStyle: {
              stroke: '#ffaa00'
            }
          });
        }
      }
    } else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
      }
    }
  }
};
