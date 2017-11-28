'use strict';

$(function () {
    $('.del').click((e) => {
        confirm('确定要删除吗');
        const target = $(e.target);
        const id = target.data('id');
        const tr = $(`.item-id-${id}`);

        $.ajax({
            type: "DELETE",
            url: `/admin/list?id=${id}`
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