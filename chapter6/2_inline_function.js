const aDriver = {
  numberOfLateDeliveries: 0,
};

function rating(aDriver) {
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}
