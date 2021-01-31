import { CronJob } from "cron";
import axios from "axios";
import { MessageEmbed } from "discord.js";
import { DiscordClient } from "../app";

const affixesJob = new CronJob("0 19 * * 2", async () => {
	const regions: string[] = await axios
		.get(`http://${process.env.discord_bot_api_url}/api/regions`)
		.then((r) => {
			return r.data.regions;
		});
	for (let i = 0; i < regions.length; i++) {
		const region: string = regions[i];
		const { affixes, servers } = await axios
			.get(`http://${process.env.discord_bot_api_url}/api/affixes`, {
				data: { region: region, locale: "us" },
			})
			.then((r) => {
				return r.data;
			});
		for (let j = 0; j < servers.length; j++) {
			const message = new MessageEmbed();
			const today = new Date().toISOString().slice(0, 10);
			message.setTitle(`${region.toUpperCase()} Affixes (${today})`);
			message.setColor("BLUE");
			for (let k = 0; k < affixes.details.length; k++) {
				message.addField(affixes.details[k].name, affixes.details[k].description);
			}
			try {
				const serverID = servers[j].serverID;
				const channelID = servers[j].channelID;
				const guildData = DiscordClient.guilds.cache.get(serverID);
				if (guildData != undefined) {
					const channel = guildData.channels.cache.get(channelID);
					if (channel != undefined) {
						// @ts-ignore
						// For some reason Typescript can't find the send property
						channel.send(message);
					}
				}
			} catch (err) {
				console.log(err);
			}
		}
	}
});
export { affixesJob };
