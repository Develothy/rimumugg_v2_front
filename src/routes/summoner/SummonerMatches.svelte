<script lang="ts">
    import {onMount} from "svelte";

    export let matches: any;
    export let version: any;
    let itemData = null;

    function smnSearch(smn) {
        const encodedSmn = encodeURIComponent(smn);
        window.location.href = `/summoner?smn=${encodedSmn}`;
    }

    const itemMouseEnterHandle = async () => {
        itemData = await fetchItem();
        console.log('item data :', itemData);
    }

    onMount(() => {
        // 초기화 옵션
        itemMouseEnterHandle();
    })

    async function fetchItem() {
        let url = 'http://localhost:8088/api/es?num=1001'
        let response = await fetch(url, {mode: 'cors'});
        console.log('itemData', response);
    }

</script>

<div class="main-card2 mb-3 card">
    <div class="table-responsive">

        <table class="table align-middle text-truncate mb-0 table-borderless table-hover">
            {#each matches as match}

            <!-- match list -->
            <tr class="text-center align-middle {match.table}" >
                <!-- match win or lose -->
                <th scope="row" class="{match.win}" width="5%">
                    <span> {match.win} </span>
                </th>
                <!-- match info -->
                <td width="20%">
                    <p class="small"> {match.queueId} </p>
                    <h6><b> {match.myGame.inChamp}</b> </h6>
                    <span> {match.gameDuration} </span>
                    <p class="small text-secondary"> {match.gamePlayedAt} </p>
                </td>
                <!-- match champ -->
                <td width="10%">
                    <img src= 'https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{match.myGame.inChamp}.png' alt="myChamp" width="100px">

                </td>
                <!-- match rune -->
                <td width="5%" >
                    <img src='https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/{match.myGame.rune1}.png' alt="rune1" width="20px" class="m-1 d-block">
                    <img src='https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/{match.myGame.rune2}.png' alt="rune2" width="20px" class="m-1 d-block">
                    <img src='https://ddragon.leagueoflegends.com/cdn/{version}/img/spell/{match.myGame.spell1}.png' alt="spell1" width="20px" class="m-1 d-block">
                    <img src='https://ddragon.leagueoflegends.com/cdn/{version}/img/spell/{match.myGame.spell2}.png' alt="spell2" width="20px" class="m-1 d-block">

                </td>
                <!-- match KDA -->
                <td width="20%" class="align-middle">
                    <h5><b>{match.myGame.kill} / {match.myGame.death} / {match.myGame.assist}</b></h5>
                    <p class="small text-secondary"> 평점 {match.myGame.avg} </p>

                </td>
                <!-- match items -->
                <td width="15%" class="align-middle align-items-center" >
                    <div class="row no-gutters">
                        {#each match.myGame.itemList as item, index}
                            <div class="col-3 mb-2">
                                {#if item.num == 0}
                                    <img src="src/lib/images/img/itemNull.png" alt="itemNull" width="20px">
                                {:else }
                                    <div on:mouseenter={itemMouseEnterHandle}>
                                        <img src='https://ddragon.leagueoflegends.com/cdn/{version}/img/item/{item.num}.png' alt="itemImg" width="20px" title={item.description} class="tooltip_event">
                                        {#if itemData}
                                            <p>{itemData}</p>
                                        {/if}
                                    </div>
                                {/if}

                            </div>
                        {/each}
                        <div class="col-3 mb-2">
                            <img src="src/lib/images/img/itemNull.png" alt="itemNull" width="20px" title="보이지 않는 검이 가장 무서운 법...">
                        </div>
                    </div>
                </td>

                <!-- match participant -->
                <!-- parti 1 win team  -->
                <td width="10%" class="align-middle p-0">
                    <ul class="d-block text-truncate text-left m-0 px-0 mr-2">
                        {#each match.participants as parti, index}
                            {#if index < 5}
                                <li class="d-block text-truncate">
                                    <a on:click={() => smnSearch(parti.inName)} class="d-block text-truncate text-secondary m-0">
                                        <img src='https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{parti.inChamp}.png' alt="partiChamp" width="17px">
                                        <span class="small"> {parti.inName} </span>
                                    </a>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </td>
                <!-- parti 2 lose team  -->
                <td width="10%" class="align-middle p-0">
                    <ul class="d-block text-truncate text-left m-0 px-0 mr-2">
                        {#each match.participants as parti, index}
                            {#if index >= 5}
                                <li class="d-block text-truncate">
                                    <a on:click={() => smnSearch(parti.inName)} class="d-block text-truncate text-secondary m-0">
                                        <img src='https://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{parti.inChamp}.png' alt="partiChamp" width="17px">
                                        <span class="small"> {parti.inName} </span>
                                    </a>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </td>
            </tr>
        {/each}
        </table>
    </div>
</div>
