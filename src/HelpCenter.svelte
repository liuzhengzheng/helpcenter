<svelte:options tag="help-center" />
<script>
  import { createEventDispatcher } from 'svelte';
  // Event handling
  const dispatch = createEventDispatcher();
  export let data={url:'www.default'};
  export let title = '?';
  let count = 0;
  let ref;
  let visible = true;
  function onChangeVisible(e) {
    // dispatch("customOnClick", { text: "Sir, I don't understand your command, I only know that the current count value is: " + count });
    // const event = new CustomEvent("customOnClick", {
    //   detail: { text: "Hi, I'm custom event from Svelte web component! My own count value is: " + count },
    //   bubbles: true,
    //   cancelable: true,
    //   composed: true, // this line allows the event to leave the Shadow DOM
    // });
    // ref.dispatchEvent(event);
    visible = !visible;
  }
    function inc() {
        count++;
    }
    function dec() {
        count--;
    }
</script>
<style>
    * {
        font-size: 200%;
    }
    span {
        width: 4rem;
        display: inline-block;
        text-align: center;
    }
    .button {
        width: 64px;
        height: 64px;
        border: none;
        border-radius: 10px;
        background-color: seagreen;
        color: white;
    }
    .help-center-modal{
        position: fixed;
        bottom: 0;
        top: 50px;
        width: 360px;
        right: -360px;
        z-index: 201;
        transition: all 250ms cubic-bezier(0.5, 0, 1, 1);
        background: #f8f9fa;
        border: 1px solid #ebedf0;
        border-radius: 4px 0px 0px 0px;
        box-shadow: 0px 8px 12px 0px rgba(31, 35, 41, 0.08);
    }
    .help-center-modal.visible {
        right: 0;
    }
</style>
<button on:click={dec}>
    -
</button>
<span>{count}</span>
<button on:click={inc}>
    +
</button>
<button class="button" on:click={onChangeVisible} bind:this={ref}>
    {title}
</button>
<div class={`help-center-modal ${visible?'visible':''}`}>xxx i am a modal</div>