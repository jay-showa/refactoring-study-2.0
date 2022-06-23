/*
1. 기능을 추가하기 쉬운 형태로 수정
2. 컴파일 - 테스트 - 커밋
 */

export const statement = (invoice, plays) => {
  function playFor(aPerformance){
    return plays[aPerformance.playID];
  }

  function volumeCreditFor(aPerformance){
    let result = 0
    
    result += Math.max(aPerformance.audience - 30, 0)
    if (playFor(aPerformance).type === 'comedy') 
      result += Math.floor(aPerformance.audience / 5)

    return result;
  }

  function usd(aNumber){

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits(){
    
    let volumeCredits = 0
    for (let perf of invoice.performances){
      volumeCredits += volumeCreditFor(perf);
    }
    return volumeCredits;
  }

  function appleSauce(){
    
    let totalAmount = 0
    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf)
    }
    return totalAmount;
  }

  let result = `청구 내역 (고객명: ${invoice.customer})\n`

  for (let perf of invoice.performances) {
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`
  }

  let totalAmount = appleSauce();

  result += `총액: ${usd(totalAmount)}\n`
  result += `적립 포인트: ${totalVolumeCredits()}점\n`
  return result


  function amountFor(aPerformance){
    let result = 0;
    switch (playFor(aPerformance).type) {
      case 'tragedy': {
        result = 40000
        if (aPerformance.audience > 30) result += 1000 * (aPerformance.audience - 30)
        break
      }
      case 'comedy': {
        result = 30000
        if (aPerformance.audience > 20) result += 10000 + 500 * (aPerformance.audience - 20)
        result += 300 * aPerformance.audience
        break
      }
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }

    return result;
  }
}


export default statement
