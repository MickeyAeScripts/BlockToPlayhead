# BlockToPlayhead ⏯️

Two tiny After Effects scripts that move your selected layers to the playhead **as one block**, so the timing between them stays exactly the same.

AE's own `[` and `]` snap **each** layer to the playhead on its own, which collapses a staggered sequence into a pile. These scripts move the whole group instead.

| Script | What lands on the playhead |
|---|---|
| `BlockInToPlayhead.jsx` | the **earliest in-point** of the selection |
| `BlockOutToPlayhead.jsx` | the **latest out-point** of the selection |

## What it does

Select any number of layers, run a script, and:

1. It finds the block's edge: the earliest in-point (or the latest out-point).
2. It works out how far that edge is from the playhead.
3. It shifts **every selected layer by that same amount**. Overlaps, gaps, stagger and layer order are all kept.
4. It all happens inside a single undo step.

Trimmed layers are handled by their **visible** in/out points, just like AE's `[` / `]`. Locked layers are left where they are.

## Example

```
Before                          After  (BlockInToPlayhead)
          ▼ playhead                      ▼ playhead
Layer A   |      [=====]                  [=====]
Layer B   |           [======]                 [======]
```

## Installation

### As a Regular Script
- Place both `.jsx` files in your **Scripts** folder and run via **File → Scripts**:
  ```
  Windows: C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\
  macOS:   /Applications/Adobe After Effects [version]/Scripts/
  ```

### As a Hotkey (recommended)
Keep the `.jsx` files in a folder **without spaces** in the path and trigger them from AutoHotkey. I use `Ctrl+Alt+Shift+[` and `Ctrl+Alt+Shift+]`:

```ahk
#If WinActive("Adobe After Effects")
^!+[:: ;block in-point to playhead
WinGet, active_AE_path, ProcessPath, A
run,"%active_AE_path%" -r C:\ae_jsx\BlockInToPlayhead.jsx,, Hide
return

^!+]:: ;block out-point to playhead
WinGet, active_AE_path, ProcessPath, A
run,"%active_AE_path%" -r C:\ae_jsx\BlockOutToPlayhead.jsx,, Hide
return
#If
```

> `AfterFX.exe -r` takes the path raw. Don't put quotes around it and don't use a path with spaces, or it silently does nothing.

## Requirements

- Adobe After Effects (any version with scripting support)
- At least 1 selected layer in an active composition

## License

MIT
