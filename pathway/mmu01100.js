var expression = {
upColor:'yellow',
genes: ['mmu:207596', 'mmu:226413', 'mmu:381310', 'mmu:240055', 'mmu:238276', 'mmu:545156', 'mmu:100039795', 'mmu:19649', 'mmu:628779', 'mmu:12064', 'mmu:15898', 'mmu:16520', 'mmu:11922', 'mmu:21828', 'mmu:26938', 'mmu:26938', 'mmu:12971', 'mmu:51791', 'mmu:17181', 'mmu:22066', 'mmu:58994', 'mmu:106369', 'mmu:109620', 'mmu:67451', 'mmu:67468', 'mmu:67516', 'mmu:67516', 'mmu:69642', 'mmu:74020', 'mmu:217371', 'mmu:75668', 'mmu:195733', 'mmu:64009', 'mmu:19229', 'mmu:232813', 'mmu:329641', 'mmu:219257', 'mmu:320265', 'mmu:68355'],
conditions: [
{
	name : 'Genes of Interest',
	values: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}]
};
var proxy = function(url){return 'https://cors-anywhere.herokuapp.com/'+url;};
biojsviskegg.pathway('mmu01100').proxy(proxy).expression(expression).target(document.getElementById('keggViewer')).init();