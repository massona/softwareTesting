class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end
    }

    toString() {
        return "[" + this.start + "," + this.end + "]";
    }

    /**
     * Exemple 1 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.overlaps(interval2) => true
     *
     * Exemple 2 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                                       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.overlaps(interval2) => false
     *
     * @param {Interval} interval
     * @returns {boolean}
     */
    overlaps(interval) {
        return this.end > interval.start && this.start < interval.end;
    }

    /**
     * Retourne true si cet interval contient le paramètre interval
     *
     * Exemple 1 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.includes(interval2) => true
     *
     * Exemple 2 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.includes(interval2) => false
     *
     * @param {Interval} interval
     * @returns {boolean}
     */
    includes(interval) {
        return this.start < interval.start && this.end > interval.end;
    };

    /**
     * Retourne l'union de deux intervals
     *
     * Exemple 1 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                              ▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.union(interval2) =>        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     *
     * Exemple 2 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.union(interval2) =>        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     *
     * @param {Interval} interval
     * @returns {Interval[]}
     */
    union(interval) {
        var res = [];
        if(this.overlaps(interval)) {
            res.push(new Interval((this.start < interval.start ? this.start : interval.start),(this.end >= interval.end ? this.end : interval.end)));
        }
        else {
            res.push(this, interval);
        }
        
        return res;
    };

    /**
     * Retourne l'intersection de deux intervals
     *
     * Exemple 1 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                              ▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.intersection(interval2) =>                     ▒▒▒▒▒
     *
     * Exemple 2 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.intersection(interval2) => <tableau vide>
     *
     * @param {Interval} interval
     * @returns {Interval|null}
     */
    intersection(interval) {
        var intervals = [];

        if (this.overlaps(interval) == true) {

            var startUnion = 0;
            var endUnion = 0;

            if (interval.start <= this.start) {
                startUnion = this.start
            } else {
                startUnion = interval.start
            }

            if (interval.end >= this.end) {
                endUnion = this.end
            } else {
                endUnion = interval.end
            }
            var newIterval = new Interval(startUnion, endUnion);
            intervals.push(newIterval);
        }
        return intervals;
    };

    /**
     * Retourne l'exclusion de deux intervals
     *
     * Exemple 1 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                              ▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.exclusion(interval2) =>    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒
     *
     * Exemple 2 :
     *      interval1 =                          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval2 =                                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     *      interval1.exclusion(interval2) =>    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     *
     * @param {Interval} interval
     * @returns {Interval[]}
     */
    exclusion(interval) {

    };
}

module.exports = Interval;
