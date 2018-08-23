module.exports = function() {
  spawnAttackers = function(newroom, spawn, numberattackers) {
    // console.log('in spawn attackers');
    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attackerlol');
    if (attacker.length < numberattackers) {
      // console.log('trying to spawn shit');
      if (Memory.numattackers == undefined) {
        Memory.numattackers = 1;
      }
      var namem = 'attackerlol' + Memory.numattackers;
      // console.log('NAME M ATTACKERS: ' + namem);
      //[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, MOVE, MOVE, MOVE, MOVE]
      Game.spawns['Spawn4'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], namem, {
        memory: {
          role: 'attackerlol'
        }
      });
      //Game.creeps.namem.memory.role = 'TRminer';
      //if(namem)
      Memory.numattackers = Memory.numattackers + 1;
    }
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      if (creep.memory.role == 'attackerlol') {
        // console.log(newroom);
        attackJacubyE(creep, newroom, spawn);
      }
    }
  }
  attackJacubyE = function(creep, newroom, spawn) {
    if (creep.room.name != newroom) {
      var posInAnotherRoom = new RoomPosition(25, 25, newroom);
      creep.moveTo(posInAnotherRoom);
      //creep.memory.next = 1;
    } else {
      if (spawn == 1) {
        //Game.spawns.Spawn1.createCreep([Game.ATTACK, Game.MOVE],'Attacker1');
        //var attacker = Game.creeps.Attacker1;
        if (creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.find(FIND_HOSTILE_SPAWNS)[0]);
        }
        //console.log(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]));
      } else if (spawn == 0) {
        creep.owner.username != 'LoveL'
        //var enemies= creep.room.find(Game.HOSTILE_CREEPS);
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS, {
          filter: (c) => c.owner.username != 'cluelesswalnut' || c.owner.username != 'LightLemmonDrop'
        });
        if (enemies) {
          if (creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemies[0]);
          }
        }
      } else if (spawn == 2) {
        var structures = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_EXTENSION)})[0];
        if (creep.attack(structures) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structures);
        }
      } else if (spawn == 3) {
        //Game.spawns.Spawn1.createCreep([Game.ATTACK, Game.MOVE],'Attacker1');
        //var attacker = Game.creeps.Attacker1;
        var tower = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_TOWER)})[0];
        if (creep.attack(tower) == ERR_NOT_IN_RANGE) {
          creep.moveTo(tower);
        }
        // var spawnOrExtensionsFill = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        //   filter: (s) => (s.structureType == STRUCTURE_EXTENSION)});
        //console.log(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]));
      } else if (spawn == 5) {
        //Game.spawns.Spawn1.createCreep([Game.ATTACK, Game.MOVE],'Attacker1');
        //var attacker = Game.creeps.Attacker1;
        var container = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_CONTAINER)})[0];
        if (creep.attack(container) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
        //console.log(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]));
      }
      else if (spawn == 7) {
        //Game.spawns.Spawn1.createCreep([Game.ATTACK, Game.MOVE],'Attacker1');
        //var attacker = Game.creeps.Attacker1;
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES);
        if (target) {
          if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
        // var spot = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_WALL)})[42];
        // if (creep.attack(spot) == ERR_NOT_IN_RANGE) {
        //   creep.moveTo(spot);
        // }
        //console.log(creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]));
      }
      else {
        creep.moveTo(25, 8);
      }
    }
  }
}
//module.exports = takeRoom;
