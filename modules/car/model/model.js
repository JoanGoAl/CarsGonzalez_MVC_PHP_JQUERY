function delete_car(idcar) {
    if (confirm('¿Estas seguro de que quieres borrar el coche?')) {
        // Save it!
        window.location.href = "index.php?modules=controller_car&op=delete&id=" + idcar;
        toastr.warning('Se ha borrado el coche correctamente')
    } else {
        // Do nothing!
        toastr.warning('No se ha borrado')
    }
}

function num_dummies() {

    var n_dummies = document.getElementById('numdummies').value;
    window.location.href = "index.php?modules=controller_car&op=dummies&num=" + n_dummies;

}


function showModal(carTitle, carid) {
    $("#detailsCars").show();
    $("#carModal").dialog({
        title: carTitle,
        width: 850,
        height: 500,
        resizable: false,
        modal: true,
        draggable: false,
        hide: "fold",
        show: "fold",
        buttons: {
            Update: function() {
                window.location.href = 'index.php?modules=controller_car&op=update&id=' + carid;
            },
            Delete: function() {
                $("#deleteModel").dialog({
                    title: "Eliminar coche",
                    buttons: {
                        Yes: function() {
                            window.location.href = "index.php?modules=controller_car&op=delete&id=" + carid;
                        },
                        No: function() {
                            $(this).dialog("close")
                        }
                    }
                })
            }
        } // end_Buttons
    }); // end_Dialog
} // end_showModal

function showModelDelete() {
    $('.delcar').click(function() {

    });
}

function cargarContentModel() {

}

$(document).ready(function() {
    // $('#table_crud').DataTable();

    $('.car').click(function() {
        var id = this.getAttribute('id');

        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: 'modules/car/ctrl/controller_car.php?op=read_modal&id=' + id,
            //////
        }).done(function(data) {
            $('#carModal').empty();
            $('<div></div>').attr('id', 'detailsCars', 'type', 'hidden').appendTo('#carModal');
            $('<div></div>').attr('id', 'containerCars').appendTo('#detailsCars');
            $('<div></div>').attr('id', 'div1').appendTo('#containerCars');
            $('<div></div>').attr('id', 'deleteModel').appendTo('#containerCars');
            $('#div1').html(function() {
                var content = "";
                for (row in data) {
                    content += '<br><span>' + row + ': <span id =' + row + '>' + data[row] + '</span></span>';
                } // end_for
                //////
                return content;
            });
            //////
            showModal(carTitle = data.marca + " " + data.modelo, id);

            //////
        }).fail(function() {
            window.location.href = 'index.php?page=error503';
        });
    });
});