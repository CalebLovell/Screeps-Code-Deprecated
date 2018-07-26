var container = _.max(container, c => c.store[RESOURCE_ENERGY])
if (!HAVE_LOAD && null != container && !creep.pos.isNearTo(container)) {
  creep.moveTo(container, {
    visualizePathStyle: {
      stroke: '#ffffff'
    }
  });
  return OK;
}
