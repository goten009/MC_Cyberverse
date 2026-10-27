# Persistencia

La V0.1 es una **demostración sin backend de escritura**. No utiliza MySQL ni guarda datos de clientes en servidor.
La exportación JSON es local al navegador. No crear base de datos innecesaria en esta versión.

Futura V0.2: MySQL compartido con base `mc_cyberverse`, usuario propio de menor privilegio,
migraciones versionadas y tablas de arquitectura/versiones/auditoría. No compartir tablas
ni credenciales con los cotizadores actuales.
