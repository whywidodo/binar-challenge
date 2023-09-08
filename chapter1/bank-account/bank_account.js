// Wahyu Widodo
// Versi 1
// let loop = true
// let saldo = 500000

// while (loop) {
//   let opsi = prompt(`
//    Saldo Anda saat ini adalah Rp.${saldo},-
//    _______________________
//    Pilih opsi berikut ini:
//    1. Tambah saldo
//    2. Kurangi saldo
//    3. Stop
//    `)

//   if (opsi == 1) {
//     let nominal = prompt("Masukan tambahan saldo Anda:")
//     tambahSaldo(Number(nominal))
//   } else if (opsi == 2) {
//     let nominal = prompt("Masukkan nominal saldo yang akan Anda ambil:")
//     kurangiSaldo(Number(nominal))
//   } else {
//     loop = false
//   }
// }

// function tambahSaldo(jumlah) {
//   saldo += jumlah
//   alert(`Saldo anda saat ini adalah ${saldo}`)
// }

// function kurangiSaldo(jumlah) {
//   saldo -= jumlah
//   alert(`Saldo anda saat ini adalah ${saldo}`)
// }


// Versi 2
let saldo = 10000
document.getElementById('saldo').textContent = saldo

const updateSaldo = (saldo) => {
  document.getElementById('saldo').textContent = saldo
}

const tambahSaldo = () => {
  let nominal = prompt("Masukan tambahan saldo Anda:")
  saldo += parseInt(nominal)
  updateSaldo(saldo)
}

const kurangiSaldo = () => {
  let nominal = prompt("Masukan pengambilan saldo Anda:")
  if(saldo < nominal){
    alert("Saldo tidak mencukupi penarikan")
  }else {
    saldo -= parseInt(nominal)
    updateSaldo(saldo)
  }
}