-- Wahyu Widodo


-- Create Database
-- ---------------
CREATE DATABASE perbankan
-- List Entity
-- 1. bank
-- 2. nasabah
-- 3. rekening
-- 4. kategori
-- 5. penarikan
-- 6. transfer
-- ---------------


-- Create Table
-- ---------------
-- 1. Bank
CREATE TABLE bank (
   id integer NOT NULL,
   nama_bank character(50) NOT NULL,
   kode_bank character(3) NOT NULL,
   CONSTRAINT pk_bank PRIMARY KEY (id)
)

-- 2. Nasabah
CREATE TABLE nasabah (
   id integer NOT NULL, 
   nama_nasabah character(50) NOT NULL,
   email character(50),
   nomor_telepon character(15),
   nama_orangtua character(50),
   tanggal_lahir date,
   CONSTRAINT pk_nasabah PRIMARY KEY (id)
)

-- 3. Rekening
CREATE TABLE rekening (
   id integer NOT NULL,
   id_nasabah integer NOT NULL,
   id_bank integer NOT NULL,
   username character(20),
   password character(255),
   no_rekening integer,
   saldo integer,
   CONSTRAINT pk_rekening PRIMARY KEY (id),
   CONSTRAINT fk_bank FOREIGN KEY (id_bank)
      REFERENCES bank (id)
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
   CONSTRAINT fk_nasabah FOREIGN KEY (id_nasabah)
      REFERENCES nasabah (id)
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
)

-- 4. Kategori
CREATE TABLE kategori (
   id integer NOT NULL,
   nama_kategori character(20),
   CONSTRAINT pk_kategori PRIMARY KEY (id)
)

-- 5. Penarikan
CREATE TABLE penarikan (
   id integer NOT NULL, 
   id_kategori integer NOT NULL,
   id_rekening integer NOT NULL,
   nominal integer,
   tanggal_transaksi date,
   CONSTRAINT pk_penarikan PRIMARY KEY (id),
   CONSTRAINT fk_kategori FOREIGN KEY (id_kategori)
      REFERENCES kategori (id)
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
   CONSTRAINT fk_rekening FOREIGN KEY (id_rekening)
      REFERENCES rekening (id)
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
)

-- 6. Transfer
CREATE TABLE transfer (
   id integer NOT NULL, 
   id_kategori integer NOT NULL,
   id_rekening integer NOT NULL,
   id_bank_tujuan integer NOT NULL,
   no_rekening_tujuan integer,
   nama_penerima character(50),
   nominal integer,
   tanggal_transaksi date,
   CONSTRAINT pk_transfer PRIMARY KEY (id),
   CONSTRAINT fk_kategori FOREIGN KEY (id_kategori)
      REFERENCES kategori (id)
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
   CONSTRAINT fk_rekening FOREIGN KEY (id_rekening)
      REFERENCES rekening (id)
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
   CONSTRAINT fk_bank FOREIGN KEY (id_bank_tujuan)
      REFERENCES bank (id)
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
)


-- Insert Data
-- ---------------
-- 1. Bank
-- --------------------#id   #nama_bank   #kode_bank
INSERT INTO bank VALUES('1', 'BANK BNI', '001');
INSERT INTO bank VALUES('2', 'BANK BCA', '002');
INSERT INTO bank VALUES('3', 'BANK BRI', '003');

-- 2. Nasabah
-- -----------------------#id   #nama_nasabah   #email   #nomor_telepon   #nama_orangtua   #tanggal_lahir
INSERT INTO nasabah VALUES('1', 'Wahyu Widodo', 'mr.wahyuwidodo@gmail.com', '085', 'Nama Ortuku', '2021-05-25');
INSERT INTO nasabah VALUES('2', 'Muhammad Widodo', 'm.widodo@gmail.com', '085', 'Nama Ortu Muhammad', '2020-04-24');

-- 3. Rekening
-- ------------------------#id #id_nasabah #id_bank #username #password #no_rekening #saldo
INSERT INTO rekening VALUES('1', '1', '1', 'wahyu', '12345', '888000', '50000000');
INSERT INTO rekening VALUES('2', '2', '1', 'widodo', '12345', '888555', '1000000');
INSERT INTO rekening VALUES('3', '1', '2', 'wahyu', '12345', '333000', '70000000');

-- 4. Kategori
-- ------------------------#id #nama_kategori
INSERT INTO kategori VALUES('1', 'PENARIKAN');
INSERT INTO kategori VALUES('2', 'TRANSFER');
INSERT INTO kategori VALUES('3', 'PEMBAYARAN');

-- 5. Penarikan
-- -------------------------#id #id_kategori #id_rekening #nominal #tgl_transaksi
INSERT INTO penarikan VALUES('1', '1', '1', '500000', '2023-06-10');
INSERT INTO penarikan VALUES('2', '1', '2', '50000', '2023-06-12');

-- 6. Transfer 
-- ------------------------#id #id_kategori #id_rekening #id_bank_tujuan #no_rekening_tujuan #nama_penerima #nominal #tanggal_transaksi
INSERT INTO transfer VALUES('1', '2', '1', '2', '123123123', 'Putri Widodo', '150000', '2023-06-18');
INSERT INTO transfer VALUES('2', '2', '1', '3', '300300300', 'Putra Kencana', '100000', '2023-06-19');


-- Read Data
-- ---------------
-- 1. Bank
SELECT * FROM bank
SELECT * FROM bank WHERE id = '1'

-- 2. Nasabah
SELECT * FROM nasabah
SELECT * FROM nasabah WHERE id = '1'

-- 3. Rekening
SELECT * FROM rekening
SELECT * FROM rekening WHERE id = '1'

-- 4. Kategori
SELECT * FROM kategori
SELECT * FROM kategori WHERE id = '2'

-- 5. Penarikan
SELECT * FROM penarikan
SELECT * FROM penarikan WHERE id_rekening = '2'

-- 6. Transfer
SELECT * FROM transfer
SELECT * FROM transfer WHERE id_rekening = '1'


-- Update Data
-- ---------------
UPDATE kategori SET nama_kategori = 'TARIK TUNAI' WHERE id = '1'


-- Delete Data
-- ---------------
DELETE FROM kategori WHERE id = '3'