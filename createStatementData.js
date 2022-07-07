class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy": {
        result = 40000;
        if (this.performance.audience > 30)
          result += 1000 * (this.performance.audience - 30);
        break;
      }
      case "comedy": {
        result = 30000;
        if (this.performance.audience > 20)
          result += 10000 + 500 * (this.performance.audience - 20);
        result += 300 * this.performance.audience;
        break;
      }
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }

    return result;
  }
}

export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const calulator = new PerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    result.play = calulator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy": {
        result = 40000;
        if (aPerformance.audience > 30)
          result += 1000 * (aPerformance.audience - 30);
        break;
      }
      case "comedy": {
        result = 30000;
        if (aPerformance.audience > 20)
          result += 10000 + 500 * (aPerformance.audience - 20);
        result += 300 * aPerformance.audience;
        break;
      }
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }

    return result;
  }

  function volumeCreditFor(aPerformance) {
    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);
    if (aPerformance.play.type === "comedy")
      result += Math.floor(aPerformance.audience / 5);

    return result;
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}
