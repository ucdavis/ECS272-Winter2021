export function groupBy<T, S = T[]>(
  objectArray: T[],
  property: string,
  transform?: (key: string) => string,
  accumulate?: (acc: S, obj: T) => S
) {
  return objectArray.reduce(function (acc, obj) {
    let key = (obj as any)[property];
    if (transform) {
      key = transform(key);
    }
    if (accumulate) {
      acc[key] = accumulate(acc[key], obj);
    } else {
      if (!acc[key]) {
        acc[key] = [] as any;
      }
      (acc[key] as any).push(obj);
    }
    return acc;
  }, {} as {[key:string]: S});
}
