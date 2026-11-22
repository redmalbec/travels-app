<script lang="ts">
  let leftWidth = 40; // процент ширины левой панели
  let dragging = false;
  let container: HTMLDivElement;

  function startDrag(e: MouseEvent) {
    dragging = true;
    e.preventDefault();
  }

  function onDrag(e: MouseEvent) {
    if (!dragging || !container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    leftWidth = Math.min(80, Math.max(20, percent));
  }

  function stopDrag() {
    dragging = false;
  }
</script>

<svelte:window on:mousemove={onDrag} on:mouseup={stopDrag} />

<div class="split-container" bind:this={container}>
  <div class="split-left" style="width: {leftWidth}%">
    <slot name="left" />
  </div>
  <div class="split-divider" on:mousedown={startDrag}></div>
  <div class="split-right" style="width: calc({100 - leftWidth}% - 6px)">
    <slot name="right" />
  </div>
</div>

<style>
  .split-container {
    display: flex;
    flex-direction: row;   /* ← горизонтальное расположение */
    height: 100%;
    overflow: hidden;
  }
  .split-left,
  .split-right {
    overflow: auto;
    height: 100%;
  }
  .split-divider {
    width: 6px;            /* ← вертикальный разделитель */
    background: #d1d5db;
    cursor: col-resize;    /* ← курсор для горизонтального перетаскивания */
    flex-shrink: 0;
  }
  .split-divider:hover {
    background: #9ca3af;
  }
</style>