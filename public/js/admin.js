'use strict';

$(function () {
    $('.del').click(function (e) {
        const target = $(e.target);
        const id = target.data('id');
        const tr = $(`.item-id-${id}`);

        $.ajax({
            type: "DELETE",
            url: `/admin/list?id${id}`
        })
            .done(function (results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove()
                    }
                }
            })
    })
});