var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');
var roleCourier = require('role.courier');
var roleWorker = require('role.worker');
var roleAttacker = require('role.attacker');
var roleHealer = require('role.healer');

var roleNorthminer = require('role.northminer');
var roleNorthcur = require('role.northcur');
var roleNorthroam = require('role.northroam');

var roleNorth2miner = require('role.north2miner');
var roleNorth2cur = require('role.north2cur');
var roleNorth2roam = require('role.north2roam');

var roleNorthwestminer = require('role.northwestminer');
var roleNorthwestcur = require('role.northwestcur');
var roleNorthwestroam = require('role.northwestroam');

var roleWestminer = require('role.westminer');
var roleWestcur = require('role.westcur');
var roleWestroam = require('role.westroam');


// var units = ['harvester', 'upgrader', 'builder'];
// Memory.lifeCount = {};
// for (var unit in units) {
//   Memory.lifeCount[units[unit]] = 1;
// }

module.exports.loop = function() {

  /* ------- TOWER ------- */

  var hostiles = Game.rooms['E54S49'].find(FIND_HOSTILE_CREEPS);
  var myHurtCreeps = Game.rooms['E54S49'].find(FIND_MY_CREEPS, {
    filter: function(hurtedCreep) {
      return hurtedCreep.hits < hurtedCreep.hitsMax;
    }
  });
  var towers = Game.rooms['E54S49'].find(FIND_MY_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_TOWER
    }
  });
  if(hostiles.length > 0 && hostiles.owner != 'cluelesswalnut' || 'LightLemmonDrop') {
    var towers = Game.rooms['E54S49'].find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    towers.forEach(tower => tower.attack(hostiles[0]));
  }
  if(myHurtCreeps.length > 0) {
    towers.forEach(tower => tower.heal(myHurtCreeps[0]));
  }

  /* ------- OLD CREEP MEMORY DELETE ------- */

  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
      console.log(`${name} died. Memory cleared.`);
    }
  }

  /* ------- CREEP SPAWN ------- */

  for (let name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    } else if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    } else if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    } else if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    } else if (creep.memory.role == 'miner') {
      roleMiner.run(creep);
    } else if (creep.memory.role == 'courier') {
      roleCourier.run(creep);
    } else if (creep.memory.role == 'worker') {
      roleWorker.run(creep);
    } else if (creep.memory.role == 'northminer') {
      roleNorthminer.run(creep);
    } else if (creep.memory.role == 'northcur') {
      roleNorthcur.run(creep);
    } else if (creep.memory.role == 'northroam') {
      roleNorthroam.run(creep);
    } else if (creep.memory.role == 'north2miner') {
      roleNorth2miner.run(creep);
    } else if (creep.memory.role == 'north2cur') {
      roleNorth2cur.run(creep);
    } else if (creep.memory.role == 'north2roam') {
      roleNorth2roam.run(creep);
    } else if (creep.memory.role == 'westminer') {
      roleWestminer.run(creep);
    } else if (creep.memory.role == 'westcur') {
      roleWestcur.run(creep);
    } else if (creep.memory.role == 'westroam') {
      roleWestroam.run(creep);
    } else if (creep.memory.role == 'northwestminer') {
      roleNorthwestminer.run(creep);
    } else if (creep.memory.role == 'northwestroam') {
      roleNorthwestroam.run(creep);
    } else if (creep.memory.role == 'northwestcur') {
      roleNorthwestcur.run(creep);
    } else if (creep.memory.role == 'attacker') {
      roleAttacker.run(creep);
    } else if (creep.memory.role == 'healer') {
      roleHealer.run(creep);
    }

  }

  var minimumNumberOfMiners = 2;
  var minimumNumberOfCouriers = 3;
  var minimumNumberOfWorkers = 5;
  var minimumNumberOfBuilders = 1;
  var minimumNumberOfAttackers = 0;
  var minimumNumberOfHealers = 0;

  var minimumNumberOfNorthminer = 1;
  var minimumNumberOfNorthcur = 1;
  var minimumNumberOfNorthroam = 1;

  var minimumNumberOfNorth2miner = 1;
  var minimumNumberOfNorth2cur = 1;
  var minimumNumberOfNorth2roam = 1;

  var minimumNumberOfNorthwestminer = 0;
  var minimumNumberOfNorthwestcur = 0;
  var minimumNumberOfNorthwestroam = 0;

  var minimumNumberOfWestminer = 1;
  var minimumNumberOfWestcur = 1;
  var minimumNumberOfWestroam = 1;

  var minimumNumberOfHarvesters = 0;
  var minimumNumberOfUpgraders = 0;
  var minimumNumberOfRepairers = 0;

  // _.sum counts the number of properties in Game.creeps filtered by the
  // arrow function, which checks for the creep being a whatever role it is

  var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
  var numberOfCouriers = _.sum(Game.creeps, (c) => c.memory.role == 'courier');
  var numberOfWorkers = _.sum(Game.creeps, (c) => c.memory.role == 'worker');
  var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
  var numberOfAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');
  var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer');

  var numberOfNorthminer = _.sum(Game.creeps, (c) => c.memory.role == 'northminer');
  var numberOfNorthcur = _.sum(Game.creeps, (c) => c.memory.role == 'northcur');
  var numberOfNorthroam = _.sum(Game.creeps, (c) => c.memory.role == 'northroam');

  var numberOfNorth2miner = _.sum(Game.creeps, (c) => c.memory.role == 'north2miner');
  var numberOfNorth2cur = _.sum(Game.creeps, (c) => c.memory.role == 'north2cur');
  var numberOfNorth2roam = _.sum(Game.creeps, (c) => c.memory.role == 'north2roam');

  var numberOfWestminer = _.sum(Game.creeps, (c) => c.memory.role == 'westminer');
  var numberOfWestcur = _.sum(Game.creeps, (c) => c.memory.role == 'westcur');
  var numberOfWestroam = _.sum(Game.creeps, (c) => c.memory.role == 'westroam');

  var numberOfNorthwestminer = _.sum(Game.creeps, (c) => c.memory.role == 'northwestminer');
  var numberOfNorthwestcur = _.sum(Game.creeps, (c) => c.memory.role == 'northwestcur');
  var numberOfNorthwestroam = _.sum(Game.creeps, (c) => c.memory.role == 'northwestroam');

  var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
  var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
  var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

  // console.log(`harvesters: ${numberOfHarvesters} upgraders: ${numberOfUpgraders} builders: ${numberOfBuilders} repairers: ${numberOfRepairers} miners: ${numberOfMiners} couriers: ${numberOfCouriers} workers: ${numberOfWorkers}`)
  console.log(`miners: ${numberOfMiners} couriers: ${numberOfCouriers} workers: ${numberOfWorkers} builders: ${numberOfBuilders} attackers: ${numberOfAttackers} healers: ${numberOfHealers}
north: ${numberOfNorthminer}-${numberOfNorthcur}-${numberOfNorthroam} north2: ${numberOfNorth2miner}-${numberOfNorth2cur}-${numberOfNorth2roam} west: ${numberOfWestminer}-${numberOfWestcur}-${numberOfWestroam} northwest: ${numberOfNorthwestminer}-${numberOfNorthwestcur}-${numberOfNorthwestroam}`)

  if (numberOfMiners < minimumNumberOfMiners) {
    var newName = 'Mina' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], newName, {
        role: 'miner',
        working: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }

  else if (numberOfUpgraders < minimumNumberOfUpgraders) {
    var newName = 'Upgrada' + Memory.lifeCount['upgrader'];
    if (Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], newName, {
        role: 'upgrader',
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['upgrader']++;
    }
  }

  else if (numberOfCouriers < minimumNumberOfCouriers) {
    var newName = 'Cur' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, {
        role: 'courier',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfWorkers < minimumNumberOfWorkers) {
    var newName = 'Worka' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, {
        role: 'worker',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfBuilders < minimumNumberOfBuilders) {
    var newName = 'Builda' + Memory.lifeCount['builder'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, {
        role: 'builder',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['builder']++;
    }
  }
  else if (numberOfAttackers < minimumNumberOfAttackers) {
    var newName = 'Attacka' + Memory.lifeCount['upgrader'];
    if (Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK], newName, {
        role: 'attacker',
      }) == OK); {
      Memory.lifeCount['upgrader']++;
    }
  }
  else if (numberOfHealers < minimumNumberOfHealers) {
    var newName = 'Heala' + Memory.lifeCount['upgrader'];
    if (Game.spawns.Spawn1.createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, MOVE], newName, {
        role: 'healer',
      }) == OK); {
      Memory.lifeCount['upgrader']++;
    }
  }

  else if (numberOfNorthminer < minimumNumberOfNorthminer) {
    var newName = 'Northminer' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'northminer',
        working: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfWestminer < minimumNumberOfWestminer) {
    var newName = 'Westminer' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'westminer',
        working: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorth2miner < minimumNumberOfNorth2miner) {
    var newName = 'NorthTwominer' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'north2miner',
        working: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorthwestminer < minimumNumberOfNorthwestminer) {
    var newName = 'Northwestminer' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'northwestminer',
        working: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }

  else if (numberOfWestcur < minimumNumberOfWestcur) {
    var newName = 'Westcur' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY,
      MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, {
        role: 'westcur',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorthwestcur < minimumNumberOfNorthwestcur) {
    var newName = 'Northwestcur' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, {
        role: 'northwestcur',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorth2cur < minimumNumberOfNorth2cur) {
    var newName = 'North2cur' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, {
        role: 'north2cur',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorthcur < minimumNumberOfNorthcur) {
    var newName = 'Northcur' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, {
        role: 'northcur',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }

  else if (numberOfWestroam < minimumNumberOfWestroam) {
    var newName = 'Westroam' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'westroam',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorthwestroam < minimumNumberOfNorthwestroam) {
    var newName = 'Northwestroam' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'northwestroam',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorth2roam < minimumNumberOfNorth2roam) {
    var newName = 'North2roam' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'north2roam',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }
  else if (numberOfNorthroam < minimumNumberOfNorthroam) {
    var newName = 'Northroam' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, {
        role: 'northroam',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }

  else if (numberOfHarvesters < minimumNumberOfHarvesters) {
    var newName = 'Harv' + Memory.lifeCount['harvester'];
    if (Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], newName, {
        role: 'harvester',
        working: false,
        HAVE_LOAD: false
      }) == OK); {
      Memory.lifeCount['harvester']++;
    }
  }





  // if (!(newName < 0)) {
  //  console.log(`Spawned new creep: ${newName}`);
  // }
};
