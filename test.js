var container500 = creep.room.find(FIND_STRUCTURES, {
  filter: s => s.structureType === STRUCTURE_CONTAINER &&
    s.store[RESOURCE_ENERGY] > 500
});

if (!HAVE_LOAD && null != container500 && creep.pos.inRangeTo(container500, 5)) {
  creep.moveTo(container500);
  return OK;
}
