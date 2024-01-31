<script>
	import { NavBrand, NavHamburger, NavUl, Navbar, NavLi, Button } from 'flowbite-svelte';




</script>

<Navbar  class='mb-5'>
	<NavBrand href="/">
		
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">KOBBY'S MICROFINANCE</span>
	</NavBrand>
	<NavHamburger  />
	<NavUl >
		<NavLi href='/'>
			<Button outline >Logout</Button>
		</NavLi>
	  
	</NavUl>
</Navbar>

<slot/>