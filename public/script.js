$(() => {
    const URL = 'http://localhost:3000/users';

    const ordersStore = new DevExpress.data.CustomStore({
        key: 'id',
        load() {
            return sendRequest(`${URL}/`);
        },
        insert(values) {
            return sendRequest(`${URL}/`, 'POST', JSON.stringify(values));
        },
        update(key, values) {
            return sendRequest(`${URL}/${key}`, 'PUT', JSON.stringify(values),
            );
        },
        remove(key) {
            return sendRequest(`${URL}/${key}`, 'DELETE');
        },
    });

    const dataGrid = $('#grid').dxDataGrid({
        dataSource: ordersStore,
        keyExpr: 'id',
        repaintChangesOnly: true,
        showBorders: true,
        editing: {
            refreshMode: 'reshape',
            mode: 'cell',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
        },
        filterRow: {
            visible: true,
            applyFilter: 'auto',
        },
        headerFilter: {
            visible: true,
        },
        searchPanel: {
            visible: true,
            placeholder: "Pretraži po imenu ili emailu...",
            width: "250px"
        },
        paging: {
            pageSize: 10,
            enabled: true
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 50, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
        },
        columns: [{
            dataField: 'id',
            caption: 'ID',
            allowEditing: false,
            width: "100px",
            allowSearch: false
        }, {
            dataField: 'ime',
            dataType: 'text',
            validationRules: [{ type: 'required' }],
        }, {
            dataField: 'prezime',
            validationRules: [{ type: 'required' }],
            allowSearch: false
        }, {
            dataField: 'email',
            validationRules: [{
                type: 'email',
            }],
        }, {
            dataField: 'brojTelefona',
            caption: 'Broj telefona',
            validationRules: [{
                type: 'pattern',
                message: 'Broj telefona je u krivom formatu.',
                pattern: /^[0-9\s\-+()]+$/i,
            }]
        },
        ],

    }).dxDataGrid('instance');

    $('#refresh-mode').dxSelectBox({
        items: ['full', 'reshape', 'repaint'],
        value: 'reshape',
        inputAttr: { 'aria-label': 'Refresh Mode' },
        onValueChanged(e) {
            dataGrid.option('editing.refreshMode', e.value);
        },
    });

    $('#clear').dxButton({
        text: 'Clear',
        onClick() {
            $('#requests ul').empty();
        },
    });

    function sendRequest(url, method = 'GET', data) {
        const d = $.Deferred();

        $.ajax(url, {
            method,
            data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        }).done((result) => {
            d.resolve(result);
        }).fail((xhr) => {
            d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
        });

        return d.promise();
    }

});
