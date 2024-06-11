<script lang="ts">
	import ArrowDown from './ArrowDown.svelte';
	import ArrowUp from './ArrowUp.svelte';

  export let type: 'EXPENSE' | 'INCOME' =  'INCOME';
  export let title: string;
  export let value: number;

</script>

<div class="rounded-xl flex justify-between items-center md:text-xl w-full min-w-[320px]">
  <div class="flex items-center">
    <div class={`h-12 w-12 ${type === 'INCOME' ? 'bg-[#81D15A]' : 'bg-red-500' } rounded grid place-items-center`}>
      {#if type === 'INCOME'}
        <ArrowUp width={32} height={32}/>
      {:else}
        <ArrowDown width={32} height={32}/>
      {/if}
      
    </div>
    <p class="md:ml-4 ml-2 truncate text-sm md:text-xl">{title}</p>
  </div>
  
  <p class="font-semibold text-sm md:text-xl">
    {#if type === 'EXPENSE'} - {/if}
    R${value},00
  </p>
</div>
