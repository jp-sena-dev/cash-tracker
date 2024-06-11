<script lang="ts">
	export let showModal: boolean;
	export let handleSubmit: () => void;

	let dialog: HTMLElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<slot name="header" />
		<button class="absolute right-4 top-4" on:click={() => dialog.close()}>X</button>
		<slot />
    <button
      type="submit"
      class="bg-primary p-3 text-xl text-white rounded-md w-full"
      on:click={() => {handleSubmit(); dialog.close()}}
    >
      Enviar
    </button>
	</div>

</dialog>

<style>
	dialog {
    width: 80%;
    max-width: 32rem;
    height: 450px;
		border-radius: 1em;
		border: none;

    @media (max-width: 425px) {
      min-width: 100%;
      min-height: 100%;
      margin: 0;
		  border-radius: 0;
    }
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
    height: 90%;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
