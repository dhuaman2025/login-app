const express = require('express');
const router = express.Router();
const pool = require('../db');
const { Parser } = require('json2csv');

// Reporte HTML con Bootstrap
router.get('/report-clientes', async (req, res) => {
  try {
    const [clientes] = await pool.query('SELECT codigo, nombre, celular, dni, created_at FROM clientes');

    let html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Reporte de Clientes</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light">
        <div class="container mt-5">
          <h2 class="mb-4 text-center">Reporte de Clientes de SENATI</h2>
          <div class="table-responsive">
            <table class="table table-striped table-bordered">
              <thead class="table-dark">
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Celular</th>
                  <th>DNI</th>
                  <th>Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
    `;

    clientes.forEach(c => {
      html += `<tr>
        <td>${c.codigo}</td>
        <td>${c.nombre}</td>
        <td>${c.celular}</td>
        <td>${c.dni}</td>
        <td>${c.created_at}</td>
      </tr>`;
    });

    html += `
              </tbody>
            </table>
          </div>
          <div class="text-center mt-3">
            <a href="/report-clientes/csv" class="btn btn-success">Descargar CSV</a>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generando el reporte');
  }
});

// Reporte CSV
router.get('/report-clientes/csv', async (req, res) => {
  try {
    const [clientes] = await pool.query('SELECT codigo, nombre, celular, dni, created_at FROM clientes');
    const parser = new Parser();
    const csv = parser.parse(clientes);

    res.header('Content-Type', 'text/csv');
    res.attachment('reporte_clientes.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generando CSV');
  }
});

module.exports = router;
