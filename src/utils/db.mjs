export default class DB extends Array {
  where(props) {
    return this.find(item =>
      Object.keys(props).reduce(
        (acc, prop) => acc && item[prop] === props[prop],
        true
      )
    );
  }
}
