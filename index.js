class Timestamp {
    constructor(e, t) {
        if (e && e.e) e = e.e;
        if (e && e.nanoseconds) t = e.nanoseconds;
        if (e && e.seconds) e = e.seconds;

        if (this.seconds = e, this.nanoseconds = t, t < 0) throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
        if (t >= 1e9) throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
        if (e < -62135596800) throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
        if (e >= 253402300800) throw new FirestoreError(Code.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
    }

    static now() {
        return this.fromMillis(Date.now())
    };

    static fromDate(t) {
        return this.fromMillis(t.getTime())
    };

    static fromMillis(t) {
        var n = Math.floor(t / 1e3);
        return new this(n, 1e6 * (t - 1e3 * n))
    };
}

Timestamp.prototype.toDate = function() {
    return new Date(this.toMillis())
};

Timestamp.prototype.toMillis = function() {
    return 1e3 * this.seconds + this.nanoseconds / 1e6
};

Timestamp.prototype._compareTo = function(e) {
    return this.seconds === e.seconds ? primitiveComparator(this.nanoseconds, e.nanoseconds) : primitiveComparator(this.seconds, e.seconds)
};

Timestamp.prototype.isEqual = function(e) {
    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
};

Timestamp.prototype.toString = function() {
    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")"
};

module.exports = Timestamp;

