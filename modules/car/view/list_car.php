<style>
    .div1 {
        margin-bottom: 50px;
    }
</style>
<html>

<body>
    <div class="brand_color">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Our Brand</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <button onclick="location.href='index.php?modules=controller_car&op=create'" class="button add">Add car</button>
    <!-- <select name="order" id="order" class="select">
        <option value="def">Por orden de creación</option>
        <option value="antiguedad">De mas viejos a mas nuevos</option>
        <option value="nuevos">De mas nuevos a mas viejos</option>
        <option value="marca">Agrupar por marcas</option>
    </select> -->
    <br>
    <br>

    <h2>Para utilizar dummies pulse el boton</h2>
    <div class="container">
        <header class="d-flex justify-content-center py-3">

            <ul class="nav nav-pills">
                <form method="post" name="createDummies" id="createDummies">
                    <input type="number" id="numdummies" name="numdummies" min=2 max=100>
                    <!-- Fer que agafe el numero introduit per el number -->
                    <!-- <li class="nav-item"><a id="home" href="index.php?modules=controller_car&op=dummies&num=2" class="nav-link active" aria-current="page">Dummies</a></li> -->
                    <input type="button" name="dummies" value="dummies" onclick="num_dummies()" onKeyPress="return runScript()">

                </form>

            </ul>
        </header>
    </div>

    <br />
    <br />
    <table id="table_crud" class="display" style="margin: auto;">
        <thead>
            <tr>
                <th>Numero de bastidor</th>
                <th>Matricula</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Kilometros</th>
                <th>Combustible</th>
            </tr>
        </thead>
        <tbody>
            <?php
            while ($res = mysqli_fetch_array($resallcars)) {
                echo "<tr>";
                echo "<td>" . $res['bastidor'] . "</td>";
                echo "<td>" . $res['matricula'] . "</td>";
                echo "<td>" . $res['marca'] . "</td>";
                echo "<td>" . $res['modelo'] . "</td>";
                echo "<td>" . $res['ano'] . "</td>";
                echo "<td>" . $res['km'] . "</td>";
                echo "<td>" . $res['combustible'] . "</td>";
                echo "<td><div class='car enlaceboton btn-read' data-tr='Read' id='" . $res['id'] . "'>READ</div></td>";  //READ
                echo "<td> | <a href=\"index.php?modules=controller_car&op=update&id=" . $res['id'] . "\">Edit</a> | <a onclick=delete_car(" . $res['id'] . ")>Delete</a></td>";
                echo "</tr>";
            }

            ?>
        </tbody>
    </table>
    <div id="deleteModal"></div>
    <div id="carModal"></div>
</body>

</html>