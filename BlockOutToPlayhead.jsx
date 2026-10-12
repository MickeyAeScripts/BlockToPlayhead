// Shift selected layers as one block so the latest out-point lands on the CTI.
// Relative timing between the layers is preserved.
(function () {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) return;
    var sel = comp.selectedLayers.slice(0);
    if (!sel.length) return;

    var edge = null;
    for (var i = 0; i < sel.length; i++) {
        var t = Math.max(sel[i].inPoint, sel[i].outPoint);
        if (edge === null || t > edge) edge = t;
    }
    var offset = comp.time - edge;
    if (Math.abs(offset) < 1e-6) return;

    app.beginUndoGroup("Move Block Out To CTI");
    for (var j = 0; j < sel.length; j++) {
        if (sel[j].locked) continue;
        sel[j].startTime += offset;
    }
    app.endUndoGroup();
})();
