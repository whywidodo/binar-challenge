let accountBank = new BankAccount(50000);
let errorMessage = "Masukan nominal dalam bentuk angka!";

const tambahSaldo = () => {
  let nominal = prompt("Masukan tambahan saldo Anda:");
  let nominalParsing = parseInt(nominal);
  try {
    if (nominalParsing) {
      accountBank.deposit(nominalParsing);
    } else {
      alert(errorMessage);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const kurangiSaldo = () => {
  let nominal = prompt("Masukan pengambilan saldo Anda:");
  let nominalParsing = parseInt(nominal);
  try {
    if (nominalParsing) {
      accountBank.withdraw(nominalParsing);
    } else {
      alert(errorMessage);
    }
  } catch (error) {
    console.log(error.message);
  }
};
