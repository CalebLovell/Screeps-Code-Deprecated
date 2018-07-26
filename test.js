module.exports = {
  run: function(creep) {
    const HAVE_LOAD = creep.memory.HAVE_LOAD

    var storage = creep.room.storage

    var droppedEnergy = creep.pos.isNearTo(FIND_DROPPED_RESOURCES);

    var container = creep.pos.isNearTo(FIND_MY_STRUCTURES, {
      filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
        i.store[RESOURCE_ENERGY] > 0
    });

//    var container = _.reverse(_.sortBy(containers => container.store.energy))[0]

    var myEnergyHolders = creep.pos.isNearTo(FIND_MY_STRUCTURES, {
      filter: (i) => (i.structureType == STRUCTURE_SPAWN
              || i.structureType == STRUCTURE_EXTENSION
              || i.structureType == STRUCTURE_TOWER)
      && i.energy < i.energyCapacity
    });

    if (creep.memory.HAVE_LOAD == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.HAVE_LOAD = true;
      creep.say('\u{1f69A}'); // truck
    }
    if (creep.memory.HAVE_LOAD == true && creep.carry.energy == 0) {
      creep.memory.HAVE_LOAD = false;
      creep.say('\u{267B}'); // recycle
    }

    var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
    if (null != droppedEnergy && creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
      creep.moveTo(droppedEnergy);
      return OK;
    }

    if (!HAVE_LOAD && null != droppedEnergy && !creep.pos.isNearTo(droppedEnergy)) {
      creep.moveTo(droppedEnergy, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
      return OK;
    }
    if (!HAVE_LOAD && null != container && !creep.pos.isNearTo(container)) {
      creep.moveTo(container, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
      return OK;
    }

    if (!HAVE_LOAD && creep.pos.isNearTo(container)) {
      creep.withdraw(container, RESOURCE_ENERGY);
      return OK;
    }
    if (!HAVE_LOAD && creep.pos.isNearTo(droppedEnergy)) {
      creep.pickup(droppedEnergy, RESOURCE_ENERGY);
      return OK;
    }


    if (HAVE_LOAD && !creep.pos.isNearTo(myEnergyHolders)) {
      creep.moveTo(myEnergyHolders, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }
    if (myEnergyHolders == undefined) {
      myEnergyHolders = storage
    }
    if (HAVE_LOAD && !creep.pos.isNearTo(storage)) {
      creep.moveTo(storage, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      return OK;
    }

    if (HAVE_LOAD && creep.pos.isNearTo(myEnergyHolders)) {
      creep.transfer(myEnergyHolders, RESOURCE_ENERGY);
      return OK;
    }
    if (myEnergyHolders == undefined) {
      myEnergyHolders = storage
    }
    if (HAVE_LOAD && creep.pos.isNearTo(storage)) {
      creep.transfer(storage, RESOURCE_ENERGY);
      return OK;
    }
  }
}
